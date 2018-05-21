
var K256 = new Array(
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
    0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
    0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
);

/* global arrays */
var ihash, count, buffer;
var sha256_hex_digits = "0123456789abcdef";

exports.tsl_sha256 = {
    /* SHA256 logical functions */
    rotateRight: function(n,x) {
        return ((x >>> n) | (x << (32 - n)));
    },
    choice: function(x,y,z) {
        return ((x & y) ^ (~x & z));
    },
    majority: function(x,y,z) {
        return ((x & y) ^ (x & z) ^ (y & z));
    },
    sha256_Sigma0: function(x) {
        return (this.rotateRight(2, x) ^ this.rotateRight(13, x) ^ this.rotateRight(22, x));
    },
    sha256_Sigma1: function(x) {
        return (this.rotateRight(6, x) ^ this.rotateRight(11, x) ^ this.rotateRight(25, x));
    },
    sha256_sigma0: function(x) {
        return (this.rotateRight(7, x) ^ this.rotateRight(18, x) ^ (x >>> 3));
    },
    sha256_sigma1: function(x) {
        return (this.rotateRight(17, x) ^ this.rotateRight(19, x) ^ (x >>> 10));
    },
    sha256_expand: function(W, j) {
        return (W[j&0x0f] += this.sha256_sigma1(W[(j+14)&0x0f]) + W[(j+9)&0x0f] +
            this.sha256_sigma0(W[(j+1)&0x0f]));
    },

    safe_add: function(x, y)
    {
        var lsw = (x & 0xffff) + (y & 0xffff);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xffff);
    },

    sha256_init: function() {
        ihash = new Array(8);
        count = new Array(2);
        buffer = new Array(64);
        count[0] = count[1] = 0;
        ihash[0] = 0x6a09e667;
        ihash[1] = 0xbb67ae85;
        ihash[2] = 0x3c6ef372;
        ihash[3] = 0xa54ff53a;
        ihash[4] = 0x510e527f;
        ihash[5] = 0x9b05688c;
        ihash[6] = 0x1f83d9ab;
        ihash[7] = 0x5be0cd19;
    },

    sha256_transform: function() {
        var a, b, c, d, e, f, g, h, T1, T2;
        var W = new Array(16);

        a = ihash[0];
        b = ihash[1];
        c = ihash[2];
        d = ihash[3];
        e = ihash[4];
        f = ihash[5];
        g = ihash[6];
        h = ihash[7];

        for(var i=0; i<16; i++)
            W[i] = ((buffer[(i<<2)+3]) | (buffer[(i<<2)+2] << 8) | (buffer[(i<<2)+1]
                << 16) | (buffer[i<<2] << 24));

        for(var j=0; j<64; j++) {
            T1 = h + this.sha256_Sigma1(e) + this.choice(e, f, g) + K256[j];
            if(j < 16) T1 += W[j];
            else T1 += this.sha256_expand(W, j);
            T2 = this.sha256_Sigma0(a) + this.majority(a, b, c);
            h = g;
            g = f;
            f = e;
            e = this.safe_add(d, T1);
            d = c;
            c = b;
            b = a;
            a = this.safe_add(T1, T2);
        }

        ihash[0] += a;
        ihash[1] += b;
        ihash[2] += c;
        ihash[3] += d;
        ihash[4] += e;
        ihash[5] += f;
        ihash[6] += g;
        ihash[7] += h;
    },
    sha256_update: function(data, inputLen) {
        var i, index, curpos = 0;
        index = ((count[0] >> 3) & 0x3f);
        var remainder = (inputLen & 0x3f);

        if ((count[0] += (inputLen << 3)) < (inputLen << 3)) count[1]++;
        count[1] += (inputLen >> 29);

        for(i=0; i+63<inputLen; i+=64) {
            for(var j=index; j<64; j++)
                buffer[j] = data.charCodeAt(curpos++);
            this.sha256_transform();
            index = 0;
        }
        for(var j=0; j<remainder; j++)
            buffer[j] = data.charCodeAt(curpos++);
    },
    sha256_final: function() {
        var index = ((count[0] >> 3) & 0x3f);
        buffer[index++] = 0x80;
        if(index <= 56) {
            for(var i=index; i<56; i++)
            buffer[i] = 0;
        } else {
            for(var i=index; i<64; i++)
                buffer[i] = 0;
            this.sha256_transform();
            for(var i=0; i<56; i++)
                buffer[i] = 0;
        }
        buffer[56] = (count[1] >>> 24) & 0xff;
        buffer[57] = (count[1] >>> 16) & 0xff;
        buffer[58] = (count[1] >>> 8) & 0xff;
        buffer[59] = count[1] & 0xff;
        buffer[60] = (count[0] >>> 24) & 0xff;
        buffer[61] = (count[0] >>> 16) & 0xff;
        buffer[62] = (count[0] >>> 8) & 0xff;
        buffer[63] = count[0] & 0xff;
        this.sha256_transform();
    },

    sha256_encode_bytes: function() {
        var j=0;
        var output = new Array(32);
        for(var i=0; i<8; i++) {
            output[j++] = ((ihash[i] >>> 24) & 0xff);
            output[j++] = ((ihash[i] >>> 16) & 0xff);
            output[j++] = ((ihash[i] >>> 8) & 0xff);
            output[j++] = (ihash[i] & 0xff);
        }
        return output;
    },

    sha256_encode_hex: function() {
        var output = new String();
        for(var i=0; i<8; i++) {
            for(var j=28; j>=0; j-=4)
                output += sha256_hex_digits.charAt((ihash[i] >>> j) & 0x0f);
        }
        return output;
    },

    sha256_digest: function(data) {
        this.sha256_init();
        this.sha256_update(data, data.length);
        this.sha256_final();
        return this.sha256_encode_hex();
    },
}


