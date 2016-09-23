FROM casecommons/ca_intake_base_image:latest


ENV APP_HOME /ca_intake
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ENV BUNDLE_PATH /ca_intake/ruby_gems

COPY Gemfile Gemfile.lock ./
COPY package.json ./

ENV BUNDLE_PATH /ca_intake/ruby_gems

RUN bundle install -j24
RUN npm install --spin=false

COPY . ./
