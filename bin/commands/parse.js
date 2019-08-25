"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
const split_1 = __importDefault(require("split"));
const command_1 = require("../command");
let ParseCommand = class ParseCommand {
    get description() {
        return "Parses hcidump output";
    }
    get options() {
        const result = {
            someDummyParameter: {
                nargs: 1,
                type: 'string',
                default: 'A default value',
                description: 'Some parameter description'
            },
            anotherDummyParameter: {
                nargs: 1,
                type: 'string',
                default: 'Another default value',
                description: 'Another parameter description'
            }
        };
        return result;
    }
    run(name, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            let record = null;
            let buffer = [];
            process.stdin.pipe(split_1.default()).on('data', (line) => {
                if (line.startsWith('> HCI Event: ')) {
                    if (record) {
                        buffer.push(record);
                        process.stdout.write(JSON.stringify(record));
                        process.stdout.write('\n');
                    }
                    record = {};
                    record.time = line.substr(line.length - 26);
                }
                else if (line.startsWith('        Address: ')) {
                    record.address = line.substr(17, 17);
                    record.resolution = line.substr(36, line.length - 37);
                }
                else if (line.startsWith('        RSSI:')) {
                    record.rssi = +line.substring(14, line.indexOf(' dBm', 14));
                }
                else if (line.startsWith('        Company: ')) {
                    record.company = line.substring(17, line.lastIndexOf(' ') - 1);
                }
                else if (line.startsWith('          Data: ')) {
                    record.data = line.substring(16);
                }
            });
        });
    }
};
ParseCommand = __decorate([
    command_1.Command
], ParseCommand);
exports.ParseCommand = ParseCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvcGFyc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUEwQjtBQU8xQix3Q0FBK0U7QUFpQi9FLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFDckIsSUFBVyxXQUFXO1FBQ2xCLE9BQU8sdUJBQXVCLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQVcsT0FBTztRQUNkLE1BQU0sTUFBTSxHQUF3RDtZQUNoRSxrQkFBa0IsRUFBRTtnQkFDaEIsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsV0FBVyxFQUFFLDRCQUE0QjthQUM1QztZQUVELHFCQUFxQixFQUFFO2dCQUNuQixLQUFLLEVBQUUsQ0FBQztnQkFDUixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsdUJBQXVCO2dCQUNoQyxXQUFXLEVBQUUsK0JBQStCO2FBQy9DO1NBQ0osQ0FBQztRQUVGLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFWSxHQUFHLENBQUMsSUFBWSxFQUFFLElBQTZCOztZQUN4RCxJQUFJLE1BQU0sR0FBVyxJQUFxQixDQUFDO1lBQzNDLElBQUksTUFBTSxHQUFhLEVBQUUsQ0FBQztZQUUxQixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDNUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO29CQUNsQyxJQUFJLE1BQU0sRUFBRTt3QkFDUixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNwQixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQzdDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUM5QjtvQkFFRCxNQUFNLEdBQUcsRUFBUyxDQUFDO29CQUNuQixNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQztpQkFDL0M7cUJBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7b0JBQzdDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3JDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQztpQkFDekQ7cUJBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO29CQUN6QyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDL0Q7cUJBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7b0JBQzdDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDbEU7cUJBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7b0JBQzVDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDcEM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7S0FBQTtDQUNKLENBQUE7QUFuRFksWUFBWTtJQUR4QixpQkFBTztHQUNLLFlBQVksQ0FtRHhCO0FBbkRZLG9DQUFZIn0=