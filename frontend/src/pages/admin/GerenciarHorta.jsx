const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const dados = new FormData();

    dados.append('nome', formData.nome);

    dados.append(
      'nome_cientifico',
      formData.nome_cientifico
    );

    dados.append(
      'descricao',
      formData.descricao
    );

    dados.append(
      'modo_de_uso',
      formData.modo_de_uso
    );

    dados.append(
      'contraindicacoes',
      formData.contraindicacoes
    );

    dados.append(
      'efeitos',
      formData.efeitos
    );

    if (formData.imagem) {

      dados.append(
        'imagem',
        formData.imagem
      );

    }

    // EDITAR
    if (plantaEditando) {

      await api.put(

        `/horta/${plantaEditando.horta_id}`,

        dados,

        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }

      );

    }

    // CADASTRAR
    else {

      await api.post(

        '/horta/',

        dados,

        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }

      );

    }

    await carregarPlantas();

    setModalAberto(false);

    setPlantaEditando(null);

    setFormData({
      nome: '',
      nome_cientifico: '',
      descricao: '',
      modo_de_uso: '',
      contraindicacoes: '',
      efeitos: '',
      imagem: null
    });

  } catch (error) {

    console.error(
      'Erro ao salvar planta:',
      error
    );

  }

};