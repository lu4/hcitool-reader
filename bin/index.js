"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const yargs_1 = __importDefault(require("yargs"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const command_1 = require("./command");
class Runner {
    static main(cwd) {
        return __awaiter(this, void 0, void 0, function* () {
            let directory = './commands';
            let filenames = fs
                .readdirSync(path.join(__dirname, directory))
                .filter(filename => path.extname(filename) === '.d.ts' || path.extname(filename) === '.ts');
            let descriptors = [];
            for (let filename of filenames) {
                let joined = path.join(directory, filename);
                if (joined.toLocaleLowerCase().endsWith('.d.ts')) {
                    joined = joined.substring(0, joined.length - 5);
                }
                else if (joined.toLocaleLowerCase().endsWith('.ts')) {
                    joined = joined.substring(0, joined.length - 3);
                }
                let module = yield Promise.resolve().then(() => __importStar(require(`./${joined}`)));
                let declarations = Object.keys(module).map(key => module[key]);
                for (let declaration of declarations) {
                    if (command_1.IsCommand(declaration)) {
                        let name = path.parse(filename).name;
                        let instance = new declaration();
                        descriptors.push({ name, instance, declaration });
                    }
                }
            }
            descriptors.sort((x, y) => x.name < y.name ? -1 : x.name === y.name ? 0 : 1);
            yargs_1.default
                .help()
                .scriptName(JSON.parse(fs.readFileSync(path.join(cwd, 'package.json')).toString()).name)
                .usage('Usage: $0 <command> [options]')
                .demandCommand(1);
            for (const descriptor of descriptors) {
                yargs_1.default.command(descriptor.name, descriptor.instance.description, args => {
                    const { options } = descriptor.instance;
                    const keys = Object.keys(options);
                    keys.sort();
                    for (const key of keys) {
                        args = args.option(key, options[key]);
                    }
                    return args;
                });
            }
            const argv = yargs_1.default.help('h')
                .strict()
                .alias('h', 'help')
                .showHelpOnFail(true)
                .parse();
            const [commandName] = argv._;
            const target = descriptors.find(x => x.name === commandName);
            if (target) {
                yield target.instance.run(commandName, argv);
            }
            else {
                console.log(`Command '${commandName}' not found!`);
            }
        });
    }
}
exports.Runner = Runner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0QkFBMEI7QUFFMUIsa0RBQTBCO0FBRTFCLHVDQUF5QjtBQUN6QiwyQ0FBNkI7QUFFN0IsdUNBQTJEO0FBRTNELE1BQWEsTUFBTTtJQUNSLE1BQU0sQ0FBTyxJQUFJLENBQUMsR0FBVzs7WUFDaEMsSUFBSSxTQUFTLEdBQUcsWUFBWSxDQUFDO1lBQzdCLElBQUksU0FBUyxHQUFHLEVBQUU7aUJBQ2IsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2lCQUM1QyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDO1lBRWhHLElBQUksV0FBVyxHQUErQixFQUFFLENBQUM7WUFFakQsS0FBSyxJQUFJLFFBQVEsSUFBSSxTQUFTLEVBQUU7Z0JBQzVCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUU1QyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDOUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ25EO3FCQUFNLElBQUksTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNuRCxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxD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