import { DataSource, DataSourceOptions } from 'typeorm';
import config from './typeorm.config';

const dataSource = new DataSource(config as DataSourceOptions);

export default dataSource;
