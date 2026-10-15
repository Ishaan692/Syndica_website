import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Syndica — Order is a product';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#0A0A0B',
          padding: '80px',
          border: '1px solid rgba(236,232,223,0.14)',
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {/* Logo Mark */}
          <div
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '4px',
                right: '4px',
                height: '2px',
                backgroundColor: 'rgba(236,232,223,0.4)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '4px',
                right: '4px',
                height: '2px',
                backgroundColor: 'rgba(236,232,223,0.8)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '28px',
                left: '4px',
                right: '4px',
                height: '2px',
                backgroundColor: 'rgba(236,232,223,0.4)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '19px',
                top: '4px',
                bottom: '4px',
                width: '2px',
                backgroundColor: '#ECE8DF',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '18px',
                top: '19px',
                width: '4px',
                height: '4px',
                backgroundColor: '#FF4F2B',
              }}
            />
          </div>

          <span
            style={{
              fontSize: '24px',
              fontWeight: 700,
              letterSpacing: '0.28em',
              color: '#ECE8DF',
            }}
          >
            SYNDICA
          </span>
        </div>

        {/* Center Display Type */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div
            style={{
              fontSize: '84px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#ECE8DF',
              lineHeight: 0.9,
            }}
          >
            ORDER IS
          </div>
          <div
            style={{
              fontSize: '84px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#ECE8DF',
              lineHeight: 0.9,
            }}
          >
            A PRODUCT.
          </div>
        </div>

        {/* Bottom Tagline */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            borderTop: '1px solid rgba(236,232,223,0.14)',
            paddingTop: '24px',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              color: 'rgba(236,232,223,0.68)',
              fontFamily: 'monospace',
            }}
          >
            BrokerOS · ClientOS · Atlas · Fabric · Vector
          </span>
          <span
            style={{
              fontSize: '14px',
              color: '#FF4F2B',
              fontFamily: 'monospace',
            }}
          >
            LIVE · PILOT IN PROGRESS
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
