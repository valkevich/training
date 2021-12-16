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

    async getFile(user, name) {
        try {
            const filePath = `${config.assetsPath}\\${user}\\${name}`;
            await fs.readFile(filePath, (err, data) => {
                if (err) {
                    throw new Error('File reading error!');
                } else {
                    return file.data = data;
                }
            });
            console.log(file);
            return file;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new FileService();