import {json, urlencoded} from "body-parser";
import cors from "cors";
import express, {Request, Response} from "express";
import {PrismaClient} from '@prisma/client';

const app = express();

export class Application {
    private prisma: PrismaClient = new PrismaClient();

    constructor() {
        this.setupApplicationSettings();
        this.setupControllers();
    }

    setupApplicationSettings() {
        app.use(cors());
        app.use(urlencoded({extended: false}));
        app.use(json());
    }

    listen() {
        app.listen(3080, () => console.log("Listening on port 3080"));
    }

    setupControllers() {
        app.get("/recipes", (request: Request, response: Response) => {
            this.getRecipes(request, response);
        });
        app.post("/recipes", (request: Request, response: Response) => {
            this.createRecipe(request, response);
        });
    }

    async getRecipes(request: Request, response: Response) {
        try {
            // Do we have a search term query param? Do the search/mutate...
            if (request.query.search) {
                const recipes = await this.searchRecipes(<string>request.query.search);
                response.send(recipes);
            } else {
                // Get all recipes back
                const recipes = await this.prisma.recipe.findMany({
                    select: {
                        id: true,
                        name: true,
                        ingredients: true,
                        cooking_method: true,
                    }
                });
                response.send(recipes);
            }
        } catch (error) {
            response.status(500).json({message: error.message});
        }
    }

    async searchRecipes(term: string) {
        return await this.prisma.recipe.findMany({
            where: {
                OR: [{
                    name: {contains: term},
                }],
            },
            select: {
                id: true,
                name: true,
                ingredients: true,
                cooking_method: true,
            }
        });
    }

    async createRecipe(request: Request, response: Response) {
        try {
            await this.prisma.recipe.create({
                data: {
                    name: request.body.name,
                    ingredients: {
                        createMany: {
                            data: request.body.ingredients,
                        }
                    },
                    cooking_method: request.body.cooking_method,
                }
            });

            response.sendStatus(200);
        } catch (error) {
            response.status(500).json({message: error.message});
        }
    }
}

const application = new Application();

application.listen();
