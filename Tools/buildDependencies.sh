

wget https://packages.microsoft.com/config/debian/12/packages-microsoft-prod.deb -O packages-microsoft-prod.deb

sudo dpkg -i packages-microsoft-prod.deb

rm packages-microsoft-prod.deb

sudo apt-get update && sudo apt-get install -y dotnet-sdk-9.0

sudo apt-get update && sudo apt-get install -y aspnetcore-runtime-9.0

sudo apt install npm

sudo npm install -g typescript

sudo npm install -g less

sudo npm install -g nodemon

code --install-extension ms-dotnettools.csdevkit
code --install-extension ms-dotnettools.csharp

code --install-extension streetsidesoftware.code-spell-checker
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension ecmel.vscode-html-css