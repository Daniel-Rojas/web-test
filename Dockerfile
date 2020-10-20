#### Node JS Docker Image to host Web UI #####
FROM oraclelinux:7

WORKDIR /jet

# Installing archive/version control #
RUN yum -y install tar
RUN yum -y install git

# Installing nodejs #
RUN yum install -y gcc-c++ make
RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -
RUN yum -y install nodejs

# Changing nodejs to version 12.6.0 #
RUN npm install -g n
RUN n 12.6.0
RUN node --version

# Installing OJET #
RUN npm install -g @oracle/ojet-cli

# Copying tar and unzipping in image #
COPY test-app/ ./
# RUN tar -xvf web.tar

# Start up OJET #
WORKDIR /jet/test-app

# PhantomJS Workaround #
#RUN yum -y -qq update
RUN yum -y install bzip2

RUN npm install
#CMD ["ojet", "serve", "--server-only","--no-livereload"]

CMD ["ojet", "serve", "--server-only", "--no-livereload"]

EXPOSE 8181