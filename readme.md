## zipkin-ui
> This project is generated with [yo angular2-typescript generator](https://github.com/shibbir/generator-angular2-typescript) version 0.6.2.

![zipkinui](zipkinui.png)

## Installation

```bash
$ npm install --dev
$ npm install typescript -g
$ npm start
```

This starts the UI listening on http://localhost:3000, targeted to a zipkin process listening on http://localhost:9411

If you aren't already running zipkin, you can start one like this:

```bash
$ wget -O zipkin.jar 'https://search.maven.org/remote_content?g=io.zipkin.java&a=zipkin-server&v=LATEST&c=exec'
$ java -jar zipkin.jar
```

If you want to test against a different zipkin server, export the `ZIPKIN_BASE_URL` appropriately.

```bash
$ ZIPKIN_BASE_URL=http://192.168.99.100:9411 npm start
```

## Production Build
The production build is made for same origin deployment. Take a look at our [nginx configuration](https://github.com/openzipkin/docker-zipkin/blob/master/zipkin-ui/nginx.conf) for an example. This is used in the "openzipkin/zipkin-ui" docker image.

```bash
$ npm run build
```

## Running Tests
```bash
$ npm test
```

## License
<a href="https://opensource.org/licenses/Apache-2.0">Apache-2.0 License</a>
