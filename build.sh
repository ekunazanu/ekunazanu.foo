#!/usr/bin/env sh

# checkout to fresh publish branch
git branch --delete --force "public"
git checkout -b "public"

# Build site
zola build

# Move 404 page to root dir
mv --force "./docs/404/index.html" "./docs/404.html"
rm --force --recursive "./docs/404/"

# Minify CSS
python3 -m csscompressor -o "./docs/misc/main.css" "./docs/misc/main.css"
python3 -m csscompressor -o "./docs/misc/animations.css" "./docs/misc/animations.css"

# Generate PNG thumbnails
# Use images of size 1200x900
for f in ./docs/media/thumbnails/*.{svg,avif}; do magick "$f" "$f.png"; rm "$f"; done

# Add changes to public branch
git add "./docs/"
git commit -m "build: generate site"

# Switch to orig branch and show changes
git checkout "main"
git log "public"
