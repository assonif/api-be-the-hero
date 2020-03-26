import connection from '../database/connection';

class SessionController {
  async create(req, res) {
    const { id } = req.body;

    const ong = await connection('ongs')
      .select('name', 'id')
      .where({ id });

    if (!ong) {
      return res.status(400).json({ error: 'Id inválido' });
    }
    return res.json(ong);
  }
}

export default new SessionController();
