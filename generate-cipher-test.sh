#!/usr/bin/env bash

#
# Usage
# generate-cipher-test.sh <name>
#

NAME=$1

TEST_FILE="test/js/ciphers/$NAME.test.js"

if [ -f $TEST_FILE ]; then
  echo "Test file $TEST_FILE already exists. Exiting."
  exit 1
fi

TEMPLATE=$(cat <<END
var assert = require('assert');
var $NAME = require('../../../app/js/ciphers/$NAME');

describe('$NAME', function() {
  it('should work', function() {
    var ${NAME}Cipher = new ${NAME}();
    var actual = ${NAME}Cipher.encrypt('foo');
    var expected = 'foo';
    assert.equal(actual, expected);
  });
});
END
)

echo "$TEMPLATE" > "$TEST_FILE"

echo "Test file $TEST_FILE generated."
