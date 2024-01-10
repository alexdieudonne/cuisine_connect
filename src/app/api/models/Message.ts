import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['assistant', 'user'],
    }
}, {
    timestamps: true,
});

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);