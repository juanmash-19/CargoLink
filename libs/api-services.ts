// import { LoginDTO, LoginDAO } from "@/Interfaces/auth/LoginInterface"
// import { RegisterDTO, RegisterDAO } from "@/Interfaces/auth/RegisterInterface"

// export const loginUser = async (body: LoginDTO): Promise<LoginDAO> => {
//     try{
//         const response = await fetch(`http://localhost:3336/api/auth/login`,{
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(body),
//         });

//         if(!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.message || "Error de autenticacion")
//         }

//         return await response.json() as LoginDAO;
//     }catch(error){
//         console.error("Error en autenticación:", error);
//         throw new Error("No se pudo completar la autenticación. Por favor, inténtalo de nuevo.");
//     }
// }

// export const registerUser = async (body: RegisterDTO): Promise<RegisterDAO> => {
//     try{
//         const response = await fetch(`http://localhost:3336/api/auth/register`,{
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(body),
//         });

//         if(!response.ok) {
//             const errorData = await response.json();
//             console.error("Este es el error:", errorData);
//             throw new Error(errorData.message || "Error de registro");
//         }

//         return await response.json() as RegisterDAO;
//     }catch(error){
//         console.error("Error en el registro:", error);
//         throw new Error("No se pudo completar el registro. Por favor, inténtalo de nuevo.");
//     }
// }


