import dbConnect from '@/lib/dbInstance';
import UserSchema from '@/models/User';
import RecipeSchema from '@/models/Recipe';
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
                await RecipeSchema.create({
                    title: 'Juicy Roasted Chicken',
                    description: `"Roasting a whole chicken at home requires almost no effort and very few ingredients," says culinary producer Nicole McLaughlin (a.k.a. NicoleMcMom). Here are a few of her favorite tips for perfect roasted chicken every time:
                    The most important thing to know, according to Nicole: "Dry skin is crispy skin." Make sure you get the skin nice and dry with a paper towel before you season the chicken.
                    "Don't forget to season the inside as well as the outside," says Nicole, who recommends also getting under the skin with butter for extra flavor.
                    If you don't have a roasting pan, that's totally fine. Nicole prefers using a simple baking sheet with a rack on top.
                    To prevent the wings from burning during the long roasting process, Nicole tucks them under the bird before sticking the chicken in the oven.
                    `,
                    illustration: 'https://www.allrecipes.com/thmb/2IjHMz6C9K52pnhfxMZBmp4TIwU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/83557-juicy-roast-chicken-mfs495-4x3-b619cb42e7ee434db25dcb0a7e8d057d.jpg',
                    ingredients: ['butter', 'sugar', 'flour', 'eggs', 'vanilla extract', 'baking powder', 'salt'],
                })
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