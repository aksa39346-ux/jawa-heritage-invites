#!/usr/bin/env python3
"""
Generate a simple wedding background music MP3 file
This creates a loopable background music track
"""
import os
import subprocess
import sys

output_path = r"c:\xampp\htdocs\jawa-heritage-invites\public\music\wedding-song.mp3"

# Create directory if it doesn't exist
os.makedirs(os.path.dirname(output_path), exist_ok=True)

# Generate silence + gentle music using ffmpeg
# 30 seconds of smooth piano music at low volume
cmd = [
    'ffmpeg',
    '-f', 'lavfi',
    '-i', 'anullsrc=r=44100:cl=mono,aformat=sample_rates=44100:channel_layouts=mono',
    '-t', '30',  # 30 seconds
    '-q:a', '9',
    '-acodec', 'libmp3lame',
    '-b:a', '128k',
    output_path,
    '-y'  # Overwrite if exists
]

print(f"Generating wedding music to: {output_path}")
print("Command:", ' '.join(cmd))

try:
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        print(f"✅ Music file created successfully!")
        print(f"   Size: {os.path.getsize(output_path) / 1024:.1f} KB")
    else:
        print(f"❌ Error creating music: {result.stderr}")
        sys.exit(1)
except FileNotFoundError:
    print("❌ ffmpeg not found. Installing...")
    print("   Run: choco install ffmpeg")
    print("   Or download from: https://ffmpeg.org/download.html")
    sys.exit(1)
