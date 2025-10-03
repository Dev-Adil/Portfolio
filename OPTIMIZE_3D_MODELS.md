# 3D Model Optimization Guide

## Current Models to Optimize

Your portfolio uses the following 3D models:
- `public/earth/scene.gltf` + `scene.bin`
- `public/planet/scene.gltf` + `scene.bin`
- `public/desktop_pc/scene.gltf` + `scene.bin` (not currently used)

## Recommended Tools

### Option 1: glTF Transform (Recommended)
```bash
# Install
npm install -g @gltf-transform/cli

# Compress with Draco (95% size reduction)
gltf-transform draco public/earth/scene.gltf public/earth/scene-compressed.gltf

# Additional optimizations
gltf-transform optimize public/earth/scene-compressed.gltf public/earth/scene-optimized.gltf
```

### Option 2: gltf-pipeline
```bash
# Install
npm install -g gltf-pipeline

# Compress
gltf-pipeline -i public/earth/scene.gltf -o public/earth/scene-compressed.gltf -d
```

### Option 3: Online Tool
Use [glTF Transform Web](https://gltf.report/) - drag and drop your .gltf files and apply Draco compression.

## Steps to Optimize

1. **Backup Original Files**
   ```bash
   cp -r public/earth public/earth-backup
   cp -r public/planet public/planet-backup
   ```

2. **Compress Models**
   ```bash
   # Earth model
   gltf-transform draco public/earth/scene.gltf public/earth/scene-temp.gltf
   gltf-transform optimize public/earth/scene-temp.gltf public/earth/scene.gltf
   rm public/earth/scene-temp.gltf

   # Planet model
   gltf-transform draco public/planet/scene.gltf public/planet/scene-temp.gltf
   gltf-transform optimize public/planet/scene-temp.gltf public/planet/scene.gltf
   rm public/planet/scene-temp.gltf
   ```

3. **Update drei Loader** (if using Draco)
   
   The models will load automatically if you have @react-three/drei installed, which includes Draco decoder support.

4. **Test the Models**
   ```bash
   npm run dev
   ```
   
   Check that all 3D models load correctly and animations work.

5. **Verify Size Reduction**
   ```bash
   ls -lh public/earth/
   ls -lh public/planet/
   ```

## Expected Results

- **Before**: ~1-5 MB per model
- **After Draco**: ~50-250 KB per model (90-95% reduction)

## Additional Optimizations

### Mesh Simplification (if models are too detailed)
```bash
gltf-transform simplify public/earth/scene.gltf public/earth/scene.gltf --simplify 0.75
```

### Remove Unused Textures
```bash
gltf-transform prune public/earth/scene.gltf public/earth/scene.gltf
```

### Compress Textures
```bash
# Convert PNG to JPEG where possible (lossy but smaller)
gltf-transform etc1s public/earth/scene.gltf public/earth/scene.gltf --quality 128
```

## Notes

- Keep original files in `-backup` folders
- Draco compression is lossy but usually imperceptible
- Test models after each optimization
- Smaller models = faster load times = better performance scores

## Troubleshooting

If models don't load after compression:
1. Check browser console for errors
2. Ensure @react-three/drei is properly installed
3. Try without Draco first (just optimize command)
4. Restore from backup and try again with different settings

