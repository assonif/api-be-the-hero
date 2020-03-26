import connection from '../database/connection';

class GeneralIncidentController {
  async index(req, res) {
    const { page } = req.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.phone',
        'ongs.city',
        'ongs.uf',
      ])
      .limit(5)
      .offset((page - 1) * 5);

    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
  }
}

export default new GeneralIncidentController();
