#!/usr/bin/env python3
import os
import sys
import zipfile
import subprocess
import shutil

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DIST_DIR = os.path.join(ROOT_DIR, 'dist')
PUBLIC_DIR = os.path.join(ROOT_DIR, 'public')
FUNCTIONS_DIR = os.path.join(ROOT_DIR, 'functions')

def run_build():
    print("Generating schema.sql with all 93 tracks...")
    ret_schema = subprocess.run(["python3", "scripts/generate_schema_sql.py"], cwd=ROOT_DIR)
    if ret_schema.returncode != 0:
        print("Schema generation failed!")

    print("Executing npm run build...")
    ret = subprocess.run(["npm", "run", "build"], cwd=ROOT_DIR)
    if ret.returncode != 0:
        print("Build failed!")
        sys.exit(1)
    print("Build succeeded.")

def create_cloudflare_fullstack_zip():
    print("Packaging Complete Cloudflare Full-Stack Package (Assets + Functions + D1 Schema + Bindings)...")
    zip_path = os.path.join(PUBLIC_DIR, 'fallen75france-cloudflare-pages.zip')
    
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # 1. Add dist/ files (Frontend static assets)
        for root, dirs, files in os.walk(DIST_DIR):
            for file in files:
                if file.endswith('.zip') or file.endswith('.cjs') or file.endswith('.cjs.map'):
                    continue
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, DIST_DIR)
                zipf.write(full_path, arcname=rel_path)

        # 2. Add functions/ directory (Cloudflare Pages Functions with D1/R2)
        if os.path.exists(FUNCTIONS_DIR):
            for root, dirs, files in os.walk(FUNCTIONS_DIR):
                for file in files:
                    full_path = os.path.join(root, file)
                    rel_path = os.path.relpath(full_path, ROOT_DIR)
                    zipf.write(full_path, arcname=rel_path)

        # 3. Add configuration and schema files
        important_files = ['wrangler.toml', 'schema.sql', 'worker.ts', 'DEPLOY_CLOUDFLARE.md']
        for fname in important_files:
            fpath = os.path.join(ROOT_DIR, fname)
            if os.path.exists(fpath):
                zipf.write(fpath, arcname=fname)
    
    # Also place a copy inside dist so it can be served
    dist_copy = os.path.join(DIST_DIR, 'fallen75france-cloudflare-pages.zip')
    if os.path.exists(DIST_DIR):
        with open(zip_path, 'rb') as f_in, open(dist_copy, 'wb') as f_out:
            f_out.write(f_in.read())
            
    print(f"Cloudflare Full-Stack ZIP created at: {zip_path} ({os.path.getsize(zip_path)} bytes)")

def create_source_code_zip():
    print("Packaging Full Source Code ZIP...")
    zip_path = os.path.join(PUBLIC_DIR, 'fallen75france-full-source.zip')
    
    exclude_dirs = {'node_modules', '.git', 'dist', '.next', '.cache'}
    exclude_extensions = {'.zip', '.log'}
    
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(ROOT_DIR):
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            for file in files:
                ext = os.path.splitext(file)[1]
                if ext in exclude_extensions:
                    continue
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, ROOT_DIR)
                # Don't include the target zip itself
                if rel_path.startswith('public/fallen75france'):
                    continue
                zipf.write(full_path, arcname=rel_path)

    dist_copy = os.path.join(DIST_DIR, 'fallen75france-full-source.zip')
    if os.path.exists(DIST_DIR):
        with open(zip_path, 'rb') as f_in, open(dist_copy, 'wb') as f_out:
            f_out.write(f_in.read())

    print(f"Source code ZIP created at: {zip_path} ({os.path.getsize(zip_path)} bytes)")

if __name__ == '__main__':
    run_build()
    create_cloudflare_fullstack_zip()
    create_source_code_zip()
    print("All ZIP packages ready for Cloudflare deployment!")
