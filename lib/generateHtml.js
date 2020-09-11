const fs = require ("fs");
const path = require ("path");
const util = require ("util");
const inquirer = require("inquirer");
const Engineer = require("./engineer");
const Intern = require("./intern");
const Manager = require("./manager");


const templateDir = path.resolve(__dirname,"../templates")
const indexDir = path.resolve(__dirname, "../index/") 

const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)

async function render(employer){
    const html = []

    const [
        managerTemplate,
        engineerTemplate,
        internTemplate,
        mainTemplate,
    ]= await Promise.all([
        readFile(path.resolve(templateDir,"manager.html"),"utf8"),
        readFile(path.resolve(templateDir,"engineer.html"),"utf8"),
        readFile(path.resolve(templateDir,"intern.html"),"utf8"),
        readFile(path.resolve(templateDir,"main.html"),"utf8"),
    ])
   
    html.push(
        employer
         .filter((employee )=> employee.getRole() == 'Manager')
          .map(employee => {
              
            let template = managerTemplate;
            for (const key in employee) {
              template = replacePlaceholder(template, key, employee[key]);
            }
             
            return template;
          })
          .join("")
      );
      
      html.push(
        employer
          .filter(employee => employee.getRole()  ==  'Engineer')
          .map(employee => {
            let template = engineerTemplate;
            for (const key in employee) {
              template = replacePlaceholder(template, key, employee[key]);
            }
            return template;
          })
          .join("")
      );

      html.push(
        employer
          .filter(employee => employee.getRole()  ==  'Intern')
          .map(employee => {
            let template = internTemplate;
            for (const key in employee) {
              template = replacePlaceholder(template, key, employee[key]);
            }
            return template;
          })
          .join("")
      );
 
    await writeFile (path.resolve(indexDir,"index.html"),replacePlaceholder(mainTemplate,"body",html))

}

function replacePlaceholder(template, target, value) {
    const regex = new RegExp("{{ " + target + " }}", "gm");
    const newTemplate = template.replace(regex, value);
    return newTemplate;
  }
 

module.exports = render

