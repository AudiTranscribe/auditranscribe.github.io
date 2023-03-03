# macOS

1. Head to the latest releases section.
    - If there are no current releases, you may want to choose a pre-release version instead.
2. Under the downloads section, download the macOS file.
3. Unzip the installer package. The package should contain one `.dmg` file. **Do not open the `.dmg` file yet**.
4. If you were to open the `.dmg` file now, it would likely be quarantined by Apple due to it lacking a proper signing
   key. To fix this, open Terminal and run the following command. The command will remove all attributes from the `.dmg`
   file and makes it no longer quarantined. (**Note**: You may be prompted to enter your password.)
   ```bash
   sudo xattr -cr path/to/the/dmg/file
   ```
5. Once the command is run, open the `.dmg` file.
6. Drag `AudiTranscribe.app` into the Applications folder.
7. Right-click `AudiTranscribe.app` and select "Open". You should see a message "AudiTranscribe is damaged and can’t be
   opened. You should move it to the Bin". **Click on Cancel**.
8. Again, right-click `AudiTranscribe.app` and select "Open". Now click on "Open" in the pop-up that appears.
9. In the future, you just need to open AudiTranscribe normally.