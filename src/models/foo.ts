import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const FooSchema = new Schema({
    name: {
        type: Schema.Types.String,
	required: [true, 'Field is required'],
	maxlength: [70, 'Field cannot have more than `{MAXLENGTH}` characters.']
    },
    age: {
        type: Schema.Types.Number,
	required: [true, 'Field is required'],
    }
}, {
    timestamps: true
});

const FooModel = mongoose.model('Foo', FooSchema, 'Foos');
export default FooModel;

