import dbConnect from '@/lib/dbInstance';
import { getMessage } from '@/lib/openai';
import MessageSchema from '@/models/message';
import UserSchema from '@/models/User';
import { messageFormSend } from '@/types/message';
import IUser from '@/types/user';


export async function handler(request: Request) {
    const { method } = request;

    const body = await request.json();

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const messages = await MessageSchema.find({ user: (body as IUser)._id })
                    .sort({ createdAt: 'desc' })
                    .lean()
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
            try {
                if (!(body as messageFormSend).prompt)
                    throw new Error('no text provided')

                let user = await UserSchema.findOne<IUser | null>({ _id: (body as messageFormSend).user });
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

                const gptOutput = await getMessage((body as messageFormSend).messages ?? [], (body as messageFormSend).prompt)

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