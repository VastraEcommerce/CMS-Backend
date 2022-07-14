import { Model, Schema, Types, model, HydratedDocument } from 'mongoose';
import validator from 'validator';


enum DurgForms {
    tincture = "tincture",

    syrup = "syrup",

    ointment = "ointment",

    liniment = "liniment",

    gel = "gel",

    suppositories = "suppositories",

    tablets = "tablets",

    ampules = "ampules",

    drops = "drops",

    insulinPen = "insulinPen",

    spray = "spray",

    solublePowderBag = "solublePowderBag",

    pills = "pills",

    capsules = "capsules",

    liquidMixture = "liquidMixture",

    suspension = "suspension",

    solution = "solution",

    sotfgel = "sotfgel",
}
type Formualtions = {
    form: (keyof typeof DurgForms);
    concentrations: Array<number | string>
}


interface IMedicine {
    name: string;
    description: string;
    formulations: Formualtions[];

}


interface IMedicineMethods {
    fullName(): string;
}

interface MedicineModel extends Model<IMedicine, {}, IMedicineMethods> {
    createWithFullName(name: string): Promise<HydratedDocument<IMedicine, IMedicineMethods>>;
}

const schema = new Schema<IMedicine, MedicineModel, IMedicineMethods>({
    name: { type: String, required: true },
    description: { type: String },
    formulations: [{
        form: {
            type: String,
            enum: {
                values: Object.values(DurgForms),
                message: "Drug from is not valid"
            }
        },
        concentrations: [{
            type: Schema.Types.Mixed
        }]

    }]

}, {
    timestamps: true
});
// schema.static('createWithFullName', function createWithFullName(name: string) {
//     const [firstName, lastName] = name.split(' ');
//     return Medicine.create({ firstName, lastName });
// });
// schema.method('fullName', function fullName(): string {
//     return this.firstName + ' ' + this.lastName;
// });

const Medicine = model<IMedicine, MedicineModel>('Medicine', schema);

export default Medicine