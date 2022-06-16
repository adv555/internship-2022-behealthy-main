const REM_SIZE = 16;
const pxToRem = (px) => `${px / REM_SIZE}rem`;
const colors = require('./src/assets/colors/colors.json');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        128: '32rem',
        '10px': '10px',
        '11px': '11px',
        '12px': '12px',
        '15px': '15px',
        '16px': '16px',
        '20px': '20px',
        '24px': '24px',
        '30px': '30px',
        '32px': '32px',
        '40px': '40px',
        '44px': '44px',
        '64px': '64px',
        '70px': '70px',
        '76px': '76px',
        '80px': '80px',
        '205px': '205px',
        '130px': '130px',
        '208px': '208px',
        '267px': '267px',
        'chatMessages': '650px',
      },

      minWidth: {
        input: '343px',
      },

      height: {
        input: '46px',
        formSize: pxToRem(480),
        circleSignB: pxToRem(103),
      },

      lineHeight: {
        h1: pxToRem(42),
        h2: pxToRem(40),
        h3: pxToRem(32),
        h4: pxToRem(30),
      },

      colors: {
        ...colors,
        text: {
          DEFAULT: '#2A1A1F',
        },
        error: {
          DEFAULT: '#D34E24',
        },
        gray: {
          DEFAULT: '#909590',
          light: '#D4D5D4',
          ultralight: '#F2F5F7',
          dark: 'grey',
        },
        blue: {
          DEFAULT: '#175676',
          dark: '#113E55',
          light: '1E7099',
        },
        green: {
          DEFAULT: '#169873',
        },
      },

      fontSize: {
        h1: [pxToRem(32), pxToRem(42)],
        h2: [pxToRem(28), pxToRem(40)],
        h3: [pxToRem(24), pxToRem(32)],
        h4: [pxToRem(20), pxToRem(30)],
        'Ag-18': [pxToRem(18), pxToRem(27)],
        'Ag-16': [pxToRem(16), pxToRem(20)],
        'Ag-15': [pxToRem(15), pxToRem(22)],
        'Ag-14': [pxToRem(14), pxToRem(21)],
        'Ag-13': [pxToRem(13), pxToRem(21)],
        'Ag-10': [pxToRem(10), pxToRem(18)],
        'Ag-12': [pxToRem(12), pxToRem(18)],
        signLabel: pxToRem(13),
        signInput: pxToRem(15),
      },

      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },

      width: {
        xlg: pxToRem(586),
        lg: pxToRem(480),
        md: pxToRem(343),
        sm: pxToRem(151),
        sm2: pxToRem(160),
        285: pxToRem(285),
        453: pxToRem(453),
        343: pxToRem(343),
        480: pxToRem(480),
        586: pxToRem(586),
        sliderBtn: pxToRem(20),
        formSize: pxToRem(480),
        formPage: pxToRem(730),
        circleSignR: pxToRem(124),

        710: pxToRem(710),
        730: pxToRem(730),
        1440: pxToRem(1440),
      },

      minWidth: {
        input: '343px',
      },

      height: {
        input: '46px',
        338: pxToRem(338),
      },

      margin: {
        100: '100px',
      },
      gap: {
        9: pxToRem(9),
      },

      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1546px',
        desktop: '768px',
      },

      borderRadius: {
        '24px': '24px',
      },

      boxShadow: {
        card: '0px 4px 16px rgba(29, 101, 137, 0.15)',
        dashboard: '0px 1px 0px rgba(229, 229, 229, 0.75)',
      },

      fontFamily: {
        barlow: ['Barlow'],
      },
      gridTemplateColumns: {
        'date': '20% 60% 20%',
        'declaration-cards': 'repeat(auto-fill, minmax(300px, 1fr))',
        'chat': '30% 70%',
        'extendedConversation': '60% 40%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
