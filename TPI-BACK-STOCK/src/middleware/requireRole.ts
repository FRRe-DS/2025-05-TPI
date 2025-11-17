import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function requireRole(role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Missing token" });
        }

        const token = authHeader.split(" ")[1];

        const decoded: any = jwt.decode(token);
        if (!decoded) {
            return res.status(401).json({ error: "Invalid token" });
        }

        // 🔥 DEBUG: Ver qué trae realmente el token
        console.log("DECODIFICADO TOKEN:", JSON.stringify(decoded, null, 2));
        console.log("ROLES EN realm_access:", decoded.realm_access);

        const roles = decoded.realm_access?.roles || [];

        if (!roles.includes(role)) {
            return res.status(403).json({ error: "Forbidden" });
        }

        next();
    };
}
