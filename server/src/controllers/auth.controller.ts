import { Router, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Authentification } from '../../../common/authentification';
import { UserConnection } from '../../../common/userConnection';
import { User } from '../interfaces';
import { AuthService } from '../services/auth.service';
import { MongodbService } from '../services/mongodb.service';
import { TYPES } from '../types';


@injectable()
export class AuthController{
    public constructor(@inject(TYPES.AuthService) private _authService: AuthService, 
                       @inject(TYPES.MongodbService) private _mongodbService: MongodbService){
        //empty
    }

    public get router() : Router {
        
        const router: Router = Router();

        // -> /api/v1/auth/login
        router.post('/login',async (req:Request, res: Response) => {
            const auth: Authentification = req.body;

            //TODO Trouver l'utilisateur dans la BD, si l'utilisateur est null retournez le code 403

            //TODO Comparer le mot de passe de la BD avec le mot de passe de la requête, utiliser le auth.service
            //Retournez le code 403 au besoin

            //TODO Générer le jeton de l'utilisateur à l'aide du service auth.service

            //TODO Retourner les informations de connexion de l'utilisateur (voir interface UserConnection) sous format json 
            res.json();
        });
        
        // -> /api/v1/auth/signup
        router.post('/signup',async (req:Request, res: Response) => {
            const auth: Authentification = req.body;

            //TODO Valider que l'utilisateur (username) n'est pas déjà dans la BD
            //Retounez un code 405 si déjà présent

            //TODO Chiffrer le mot de passe avec auth.service

            //TODO Ajouter l'utilisateur à la BD
            //Retounez un code 500 en cas de problème

            //TODO Générer le jeton de l'utilisateur à l'aide du service auth.service
            
            //TODO Retourner les informations de connexion de l'utilisateur (voir interface UserConnection) sous format json 
            res.json();
        });
        
        return router;
    }

}