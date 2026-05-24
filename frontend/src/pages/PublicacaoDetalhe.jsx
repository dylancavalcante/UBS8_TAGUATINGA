import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import api from "../services/api"

function PublicacaoDetalhe() {

    const { id } = useParams()

    const [post, setPost] = useState(null)

    useEffect(() => {

        async function carregarPost() {

            try {

                const response = await api.get(`/publicacoes/${id}`)

                setPost(response.data)

            } catch (error) {

                console.error(error)
            }
        }

        carregarPost()

    }, [id])

    if (!post) {

        return <p>Carregando publicação...</p>
    }

    return (

        <main className="container mx-auto py-10">

            <img
                src={post.imagem_url}
                alt={post.titulo}
                className="w-full max-h-[400px] object-cover rounded-xl mb-6"
            />

            <span className="text-green-600 font-medium">
                {post.categoria}
            </span>

            <h1 className="text-4xl font-bold mb-4">
                {post.titulo}
            </h1>

            <p className="text-lg text-gray-600 mb-8">
                {post.resumo}
            </p>

            <article className="text-lg leading-8 text-gray-800">
                {post.conteudo}
            </article>

        </main>
    )
}

export default PublicacaoDetalhe