import connection from '../database/connection';

class IncidentController {
  async index(req, res) {
    const ong_id = req.headers.authorization;

    const incidents = await connection('incidents')
      .select('*')
      .where({ ong_id });

    return res.json(incidents);
  }

  async create(req, res) {
    const { title, description, value } = req.body;

    const ong_id = req.headers.authorization;

    const ongExists = await connection('ongs')
      .select('*')
      .where({ id: ong_id })
      .first();

    if (!ongExists) {
      return res.status(400).json({ error: 'Ong não encontrada' });
    }

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return res.json(id);
  }

  async delete(req, res) {
    const { id } = req.params;

    const ong_id = req.headers.authorization;

    const incident = await connection('incidents')
      .where({ id })
      .select('ong_id')
      .first();

    if (!incident) {
      return res.status(401).json({ error: 'Ocorrencia não encontrada' });
    }
    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: 'Sem permissão' });
    }

    await connection('incidents')
      .delete()
      .where({ id });
    return res.status(204).send();
  }
}

export default new IncidentController();
