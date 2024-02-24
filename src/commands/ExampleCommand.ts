import { PersonalMessage } from "../models/BotMessage";
import { User } from "../models/User";
import { encrypt } from "../utils/commonUtils";
import { DiscordCommand, InputData } from "./DiscordCommand";

interface ExampleInputData extends InputData {

    input1: string;

    input2: string;
    
}

export class ExampleCommand extends DiscordCommand {

    acceptedCommands = ["example", "exampleCommand"];

    isDirectMessageOnly = true;

    inputs = [["input1"], ["input1", "input2"]];

    requireParameters = true;
    
    protected override async execute(user: User, originalMsg: any, botMessage: PersonalMessage, inputData: ExampleInputData): Promise<PersonalMessage> {

        botMessage.addText(`Example command triggered, Input1: ${inputData.input1}, Input2: ${inputData.input2}`);
        
        return botMessage;
    }

}