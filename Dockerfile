# Create a Dockerized Consolidating CoinJoin Server.
#

#IMAGE BUILD COMMANDS
FROM christroutner/ct-base-ubuntu
MAINTAINER Chris Troutner <chris.troutner@gmail.com>

#Create the user 'rest' and add them to the sudo group.
RUN useradd -ms /bin/bash coinjoin
RUN adduser coinjoin sudo

#Set password to 'password' change value below if you want a different password
RUN echo coinjoin:password | chpasswd

#Set the working directory to be the home directory
WORKDIR /home/coinjoin

#Setup NPM for non-root global install
RUN mkdir /home/coinjoin/.npm-global
RUN chown -R coinjoin .npm-global
RUN echo "export PATH=~/.npm-global/bin:$PATH" >> /home/coinjoin/.profile
RUN runuser -l coinjoin -c "npm config set prefix '~/.npm-global'"

# Expose the port the API will be served on.
EXPOSE 5000

# Switch to user account.
USER coinjoin
# Prep 'sudo' commands.
RUN echo 'password' | sudo -S pwd

# Clone the rest.bitcoin.com repository
WORKDIR /home/coinjoin
RUN git clone https://github.com/BCH-Consolidating-CoinJoin/ccoinjoin-server

# Switch to the desired branch. `master` is usually stable,
# and `stage` has the most up-to-date changes.
WORKDIR /home/coinjoin/ccoinjoin-server

# For development: switch to unstable branch
RUN git checkout unstable

# Install dependencies
RUN npm install

VOLUME /home/coinjoin/ccoinjoin-server/logs

# Start the application.
COPY start-production start-production
COPY make-keys-dir-readable make-keys-dir-readable
CMD ["./start-production"]

#CMD ["npm", "start"]
