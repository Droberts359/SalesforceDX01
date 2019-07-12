var child_process=require('child_process');
//process.arg = [node, sfdxJavaScriptCommands.js, nameOfScratchOrg, packageName, orgWithPackage]; 

console.log('Running...  = ' + process.argv[0]); //node 
console.log('File you are running... ' + process.argv[1]); //javaScriptFile 
console.log('ScratchOrg Alias  = ' + process.argv[2]); //nameOfScratchOrg
console.log('Requested Package = ' + process.argv[3]); //packageName 
console.log('Contacting Org    = ' + process.argv[4]); //orgWithPackage
// console.log('My Test variable = ' + process.argv[5]); 

// var nameOfScratchOrg = process.argv[2];
var scratchOrg = process.argv[2] 
var packageName = process.argv[3]; 
var orgWithPackage = process.argv[4]; 

//SFDX Commands and parameters specially formatted to run in node. 
var sfdx = 'sfdx'; 
var packageFolderName = 'package';
var retreiveData = ['force:mdapi:retrieve', '-p', packageName, '-r', packageFolderName, '-u', orgWithPackage];
var zippedFilePath = ['package/unpackaged.zip','-d', '.'];
var convertData =  ['force:mdapi:convert', '-r', packageName];
var pushSource = ['force:source:push', '-u', scratchOrg]; 
var getlistofOrgs=['force:org:list'];
var createScratchOrg = ['force:org:create', '-d', '30', '-f', 'config/project-scratch-def.json', '-a', scratchOrg];
var openNewScratchOrg =['force:org:open', '-u', scratchOrg]; 
var deletePath = ['-rf', packageName]; 
var deletePath02 = ['-rf', packageFolderName];

// Execution order of sfdx commands. 
var retreiveDataResult = child_process.execFileSync(sfdx, retreiveData); // Retrieve the Metatdata from the org and save it to package fodler as unzippedpackage.zip. 
var unzipResult = child_process.execFileSync('unzip',zippedFilePath);    // unzips the package.zip file. 
var convertDataResult = child_process.execFileSync(sfdx, convertData);   // converts the package data to source data. 
var scratchOrgResult=child_process.execFileSync(sfdx, createScratchOrg); // creates the scratch org with the name specified above.
var pushSourceResult = child_process.execFileSync(sfdx, pushSource);     // pushes source to scratchOrg
var orgListResult=child_process.execFileSync(sfdx, openNewScratchOrg);   // opens the newly created scratch org. 
var orgListResult=child_process.execFileSync(sfdx, getlistofOrgs);       // confirms that the org has been added to the list of connected orgs. 
var deleteResult = child_process.execFileSync('rm',deletePath);          // deletes the path of the unpackaged data. You don't need this any more because you the data should be added to your force-app folder. 
var deletePath02 = child_process.execFileSync('rm', deletePath02);       // deletes the folder with the unzipped package.  


// console.log('retrievedDataResult = ' + retreiveDataResult);
// console.log('packageUnzipped = ' + unzipResult);
// console.log('convertedDataResult = ' + convertDataResult);  
// console.log('convertedDataResult = ' + pushSourceResult); 
// console.log('scratchOrgResult = ' + scratchOrgResult);
// console.log('The orgList = ' + orgListResult); 


// var result=JSON.parse(resultJSON);
 
// var status=result.status;
// console.log("result.status  = " + result.status);
// console.log('The results of the script ---> ' + result); 
// console.log('The results of the script ---> ' + result.nonScratchOrgs.[0]); 


