import { v4 } from "uuid";
import Material from "./material";
import Mesh from "./mesh";
import { Transform } from "./transform";

export default class GameObject {
    readonly uuid = v4();
    readonly transform = new Transform();
    mesh: Mesh | null = null;
    material: Material | null = null;
}