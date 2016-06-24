#
# Thanks to @Xe for the Dockerfile template
# https://github.com/Shuo-IRC/Shuo/pull/87/files
#

FROM nfnty/arch-nodejs

# Create a non-root user for lounge to run in.
RUN useradd --create-home lounge

# Needed for setup of Node.js
ENV HOME /home/lounge

# Customize this to specify where The Lounge puts its data.
# To link a data container, have it expose /home/lounge/data
ENV LOUNGE_HOME /home/lounge/data

# Expose HTTP
EXPOSE 9000

# Drop root.
USER lounge

# Add application files
ADD . /home/lounge

# Don't use an entrypoint here. It makes debugging difficult.
CMD cd /home/lounge; node index.js --home $LOUNGE_HOME
