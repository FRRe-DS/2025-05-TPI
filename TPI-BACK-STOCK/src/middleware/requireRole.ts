import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { decode } from "punycode";

export function requireAnyRole(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Missing token" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.decode(token) as JwtPayload | null;

        const roles = decoded?.roles || decoded?.realm_access?.roles || [];

        console.log("ROLES DETECTADOS:", roles);

        // Si al menos uno coincide → permitir
        const hasRole = roles.some((r: string) => allowedRoles.includes(r));

        if (!hasRole) {
            return res.status(403).json({ error: "Dont have access" });
        }

        next();
    };
}
