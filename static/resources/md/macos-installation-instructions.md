# macOS

1. Head to the latest releases section.
    - If there are no current releases, you may want to choose a pre-release version instead.
2. Under the downloads section, download the macOS file.
3. Unzip the installer package. The package should contain one `.dmg` file.
4. The `.dmg` file would likely be quarantined by Apple due to it lacking a proper signing key. To fix this, run the
   following command, which removes all attributes from the `.dmg` file and makes it no longer quarantined.

```bash
sudo xattr -cr path/to/the/dmg/file
```

5. Open the `.dmg` file.
6. Drag the `AudiTranscribe.app` into the Applications folder.
7. Run the application!
