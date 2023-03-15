Adobe Photoshop API Readme

Generate Token
1. Open and copy the contents of private.key in downloaded config.zip
2. Go to https://console.adobe.io/projects
3. Select a project
4. Select "Adobe Photoshop API (Trial)"
5. Paste into private key text box in "Generate access token" section and click "Generate Token" button

Client ID (API Key)
1. Go to https://console.adobe.io/projects
2. Select a project
3. Select "Adobe Photoshop API (Trial)"
4. Find CLIENT ID in "Service account (JWT)" section

Run a script (.sh)
1. Fill your token and client ID in a script (ex: hello.sh, documentManifest.sh)
token=''
apiKey=''
2. Run a script on Terminal (mac) or on git-bash (windows)
```
bash hello.sh
```