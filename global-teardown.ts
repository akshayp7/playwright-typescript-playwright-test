import path from 'path';
import AdmZip from 'adm-zip';

async function globalTeardown() {
    const reportPath = path.join(__dirname, `html-report`);
    const zip = new AdmZip();
    zip.addLocalFolder(reportPath, `./html-report`);
    zip.writeZip(`./html-report.zip`);
}

export default globalTeardown;