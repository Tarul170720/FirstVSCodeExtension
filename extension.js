// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios= require('axios')
const { XMLParser } = require('fast-xml-parser');
const xmlParser = new XMLParser();
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	const res= await axios.get('https://blog.webdevsimplified.com/rss.xml')
	const articles=xmlParser.parse(res.data).rss.channel.item.map(article=>{
		return {
			label:article.title,
			description:article.description,
			detail:article.link
		}
	})
	console.log(articles)
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "my-fist-extension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('my-fist-extension.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from my fist extension!');
	});
	const disposable1 = vscode.commands.registerCommand('my-fist-extension.serachWdsBlogExample', 
		async function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		const article= await vscode.window.showQuickPick(articles,{
			matchOnDetail: true
		})
		if (article==null) return
		vscode.env.openExternal(article.detail)
		console.log(article)
	});
	let disposable2 = vscode.commands.registerCommand('my-fist-extension.readCodeFiles', async () => {
		vscode.window.showInformationMessage('Reading Code Files...');
		const editor = vscode.window.activeTextEditor;
		if (editor) {
		const document = editor.document;
		const text = document.getText();
		vscode.window.showInformationMessage(`File name: ${document.fileName}`);
		console.log(text); // Your file content
		}
	});
	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
