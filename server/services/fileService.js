import config from '../config/config.js';
import fs from 'fs';
import path from 'path';
import * as uuid from 'uuid';


class FileService {
    writeFile(user, file) {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = `${config.assetsPath}\\${user}`;
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath);
            }
            fs.writeFileSync(path.join(filePath, fileName), file.data);
            return fileName;
        } catch (error) {
            console.log(error);
        }
    }

    getFilePath(user, name) {
        try {
            const filePath = `${config.assetsPath}\\${user}\\${name}`;
            return filePath;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new FileService();