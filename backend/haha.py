from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Digite a sua NOVA senha aqui dentro:
senha_desejada = "adminUBS8123@" 
print(senha_desejada)
hash_gerado = pwd_context.hash(senha_desejada)
print(hash_gerado)