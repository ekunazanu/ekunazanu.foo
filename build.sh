#!/usr/bin/env sh

# checkout to fresh publish branch
git branch --delete --force "public"
git checkout -b "public"

# Build site
zola build

# Minify CSS
python3 -m csscompressor -o "./deploy/misc/main.css" "./deploy/misc/main.css"

# Generate PNG thumbnails
# Use images of size 1200x900
# Could be optimzed to ignore already converted files
for f in ./deploy/media/thumbnails/*.{svg,avif}; do magick "$f" "$f.png"; rm "$f"; done

# Move all files to root directory (for GH Pages)
mv --force -t "." ./deploy/*
mv --force "./404/index.html" "./404.html"
rm --force --recursive "./deploy" "./404/"

# Add changes to deploy branch
git add "./"
git commit -m "build: generate site"

# Switch to orig branch and show changes
git checkout "main"
git log "public"
