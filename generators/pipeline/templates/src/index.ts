/**
 * @module root
 */

// Import dependencies
import _configProvider from '@vamship/config';
import { PipelineElement } from 'agc-pipeline-node';

// Load configuration and callable transform function
const config = _configProvider
    .configure('<%= projectCamelCasedName %>')
    .setApplicationScope(process.env.NODE_ENV)
    .getConfig();
import transform from './transform-function';

// Instantiate pipeline component & run
new PipelineElement(transform, config).run();

export default transform;
