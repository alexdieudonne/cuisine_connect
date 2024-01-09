import dbConnect from '@/lib/dbInstance';
import UserSchema from '@/models/User';
import jwt from 'jsonwebtoken';
import IUser from '@/types/user';


export async function handler(request: Request) {
    const { method } = request;

    const body = await request.json();

    await dbConnect();


    switch (method) {
        case 'GET':
            try {
                const user = await UserSchema.find({});
                //    res.status(200).json({ status: 'success', data: recipes });
            } catch (e) {
                console.error(e);
                return new Response('Recipe search could not be performed.', {
                    status: 404,
                })
            }
        case 'POST':
            try {
                if (!(body as IUser).email) throw new Error('Email is required')
                let user = await UserSchema.findOne<IUser | null>({ email: (body as IUser).email });
                if (!user) {
                    user = await UserSchema.create({
                        email: (body as IUser).email,
                    }).then((user) => user.toObject())
                }
                const token = jwt.sign({ user: { email: user.email } }, 'TOP_SECRET');
                return Response.json({
                    status: 'success',
                    data: {
                        user,
                        token: token
                    }
                })
            } catch (e) {
                console.error(e);
                return Response.json({
                    message: e.message ?? 'Recipe search could not be performed.',
                }, {
                    status: 500,
                })
            }
            break;
        default:
            // res.setHeader('Allow', ['GET']);
            // res.status(405).send(`Method ${method} is not allowed.`);
            break;
    }
}

export { handler as GET, handler as POST }