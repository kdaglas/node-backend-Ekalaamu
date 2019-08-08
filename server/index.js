import app from './express';
import dotenv from 'dotenv';
import db from './models';
import { routes } from './routes';

dotenv.config();

//Test DB connection
db.authenticate()
  .then(()=> {
      console.log(`successfully connected to the ${process.env.DATABASE} `);
      db.sync({ force: true, logging: true})}
  )
  .catch(err=>console.log('Error' + err));

// All routes
app.use('/api/v1/', routes());

app.get('/', (req, res) => {
    res.send('Ekalaamu!')
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>console.log(`server has started on port ${PORT}`));
