import dbConnect from '@/lib/dbInstance';
import { getMessage } from '@/lib/openai';
import MessageSchema from '@/models/message';
import UserSchema from '@/models/User';
import Message, { messageFormSend } from '@/types/message';
import IUser from '@/types/user';
import jwt from 'jsonwebtoken';

export async function handler(request: Request) {
    const { method } = request;
    const token = request.headers.get("Authorization");

    if (!token) {
        return Response.json({
            message: 'not-allowed',
        }, {
            status: 401,
        })
    }

    const user__ = jwt.verify(token.split(' ')[1], 'TOP_SECRET') as unknown as { user: IUser };
    const user_ = user__.user;


    console.log('here');
    await dbConnect();
    const messages = await MessageSchema.find<Message>({ user: user_._id })
        .sort({ createdAt: 'desc' })


    switch (method) {
        case 'GET':
            try {

                return Response.json({
                    status: 'success',
                    data: messages
                })
            } catch (e) {
                console.error(e);
                return new Response('No messages found.', {
                    status: 404,
                })
            }
        case 'POST':
            const body = await request.json();
            try {
                if (!(body as messageFormSend).prompt)
                    throw new Error('no text provided')

                let user = await UserSchema.findOne<IUser | null>({ _id: user_._id });
                if (!user) {
                    return Response.json({
                        message: 'not-allowed',
                    }, {
                        status: 401,
                    })
                }

                await MessageSchema.create({
                    user: user._id,
                    content: (body as messageFormSend).prompt,
                    role: 'user'
                })

                const gptOutput = await getMessage(messages.map(msg => {
                    return {
                        content: msg.content,
                        role: msg.role
                    }
                }), (body as messageFormSend).prompt)

                const message = await MessageSchema.create({
                    user: user._id,
                    content: gptOutput,
                    role: 'assistant'
                })

                return Response.json({
                    status: 'success',
                    data: message
                })
            } catch (e) {
                console.error(e);
                return Response.json({
                    message: e.message ?? 'Assistant must be sleeping, check back in a minute.',
                }, {
                    status: 500,
                })
            }
            break;
    }
}

export { handler as GET, handler as POST }