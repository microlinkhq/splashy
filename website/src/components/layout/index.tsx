/* eslint-disable @next/next/no-img-element */

import './globals.css'

import { ClassAttributes, ImgHTMLAttributes, JSX } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { Footer } from '@/components/footer'
import { Link } from '@/components/ui/link'
import { Inter } from 'next/font/google'
import NextLink from 'next/link'

const inter = Inter({ subsets: ['latin'] })

const SplashyLogo = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 922 312' {...props}>
    <g fill='none'>
      <path
        fill='#EB5A3C'
        d='M612.356 49.155c1.631.165 3.238.278 4.233 1.762 1.027 1.53 1.187 3.188.671 4.947-.656 2.241-1.842 3.185-3.798 4.335-.892-.083-1.745-.154-2.58-.519-1.295-.566-1.878-1.56-2.298-2.848-.628-1.928-.357-3.961.703-5.703.813-1.334 1.669-1.54 3.069-1.974'
      />
      <path
        fill='#D41654'
        d='M153.638 37.826c1.132.204 2.265.494 3.177 1.229 1.167.941 1.926 2.413 1.987 3.913.135 3.316-1.46 5.452-3.678 7.684-1.832-.018-3.286-.027-4.589-1.548-1.224-1.428-1.517-3.313-1.178-5.119.565-3.005 1.816-4.479 4.281-6.159M8.403 81.149c3.906-.197 7.407.127 10.552 2.775 1.257 1.058 1.418 2.02 1.527 3.591-.594 1.617-1.267 2.196-2.628 3.22-3.557.455-6.088-.202-9-2.408-1.426-1.081-2.018-2.087-2.262-3.887.417-1.52.615-2.174 1.811-3.291m130.251 203.057c.872.328 1.995.821 2.64 1.515 2.384 2.562 2.708 7.406 2.376 10.699-.359 3.559-.968 5.794-3.745 8.092-1.234-.363-2.346-.981-3.146-2.01-2.025-2.6-2.249-7.063-1.949-10.194.362-3.783.848-5.706 3.824-8.102'
      />
      <path
        fill='#589A4B'
        d='M329.963 127.562c.791-.042 1.596-.073 2.387-.022 8.283.531 27.71 2.839 33.038 9.028 1.8 2.091 2.86 5.107 3.045 7.836.282 4.143-.371 8.501-.691 12.643-.663 8.556-1.497 17.08-2.27 25.624l-7.109 78.756a3339 3339 0 0 0 42.531 3.866c8.426.669 18.067.519 26.263 2.439 3.666.858 5.417 3.418 7.301 6.471.434 7.007-1.136 17.819-1.868 25.128-.369 3.685-1.328 7.62-4.441 9.967-3.957 2.984-9.421 2.282-14.033 1.765a5026 5026 0 0 1-75.179-7.497c-6.636-.709-13.359-.804-19.971-1.656-4.463-.575-9.222-2.194-11.858-6.125-1.679-2.503-1.88-6.619-1.94-9.599-.215-10.796 1.826-26.031 2.836-37.177 1.155-12.757 1.644-25.735 3.692-38.392 16.69-17.59 22.447-41.718 17.969-65.376-.765-4.047-4.172-11.087-3.739-14.584.858-1.656 2.461-2.254 4.037-3.095'
      />
      <path
        fill='#D41654'
        d='M631.209 117.87c7.507.666 21.23.261 27.701 2.389 2.342.771 4.44 2.209 6.157 3.964 1.69 1.728 3.146 3.948 3.667 6.337 1.544 7.089-.164 16.846-.717 24.05-.728 9.494-1.537 19.092-1.554 28.613 15.208 1.696 30.66 1.947 45.93 2.881 2.035-13.789-.175-27.727 3.028-41.55 2.607 4.856 6.331 9.4 9.361 14.04 11.568 17.709 24.228 34.731 35.654 52.503A1346 1346 0 0 0 757.568 262c-.377 8.8.24 18.495-1.383 27.116-.612 3.252-1.765 6.34-3.755 9.012-2.451 3.291-5.905 5.087-9.926 5.667-4.435.64-19.791-.396-24.419-1.492-2.054-.487-4.04-1.326-5.717-2.622-3.53-2.728-4.662-6.466-5.295-10.675-.16-10.638.806-21.156 1.52-31.755.539-8.003.751-16.051 1.107-24.064-6.226-.713-12.61-.48-18.877-.861-8.879-.541-18.383-2.196-27.245-1.513-1.863 17.243-1.004 34.924-3.011 52.128-.513 4.397-1.99 9.598-5.73 12.347-5.567 4.093-13.818 2.423-20.254 2.062-2.995-.167-6.093-.062-9.061-.492-4.225-.612-6.957-2.114-9.417-5.643-1.431-2.053-3.456-6.094-2.343-8.676.871-2.02 5.194-4.929 6.87-6.372 10.755-9.263 17.327-21.487 19.793-35.436 3.226-18.254.82-37.342-10.104-52.613-3.538-4.947-8.096-9.035-11.561-14.028-.205-6.245.39-12.59.916-18.808 2.249-3.132 4.991-5.851 7.167-9.068 6.233-9.21 6.43-17.648 4.366-28.344'
      />
      <path
        fill='#196FA4'
        d='M200.541 245.818c-2.676-3.694-1.615-7.66-.936-11.901 3.138-19.609 4.823-38.111-5.168-56.259-1.992-3.618-6.315-7.706-6.952-11.689-.608-3.798 1.871-54.019 2.89-57.574.99-3.461 3.01-6.576 5.904-8.74 2.242-1.678 4.816-2.633 7.583-2.99 7.842-1.01 16.243.284 24.133.453 14.75.315 30.168-.914 44.749 1.602a58.3 58.3 0 0 1 16.818 5.483 59 59 0 0 1 5.141 2.929 59 59 0 0 1 4.818 3.434 59 59 0 0 1 4.446 3.904 59 59 0 0 1 4.028 4.334 58 58 0 0 1 3.569 4.719c10.249 14.801 12.489 32.956 9.247 50.428-2.773 14.949-10.422 28.617-23.194 37.193-21.988 14.763-39.654 10.552-63.848 10.862-.584 11.895-.85 23.803-1.363 35.701-.28 6.474-.049 14.17-1.819 20.417-.495 1.751-1.48 3.201-2.841 4.396-5.033 4.421-15.441 3.701-21.835 3.119-3.057-.279-6.358-1.184-8.435-3.606-4.245-4.948-2.525-19.862-1.975-26.172 6.444 5.43 14.197 15.63 22.769 17.314 1.881.369 5.117.159 6.624-1.206.857-.776 1.36-1.558 1.256-2.749-.668-7.655-19.438-19.178-25.609-23.402m37.583-106.293-1.101 23.418c-.225 4.875-.842 10.152-.259 14.993 2.044 1.725 17.385 1.504 20.916 1.213 3.796-.313 7.424-1.492 10.317-4.017 4.532-5.088 6.477-9.67 6.099-16.622-.272-5.026-1.833-9.734-5.683-13.147-7.311-6.481-20.95-5.983-30.289-5.838'
      />
      <path
        fill='#FBA62A'
        d='M446.318 102.707c5.611-.742 13.537-1.017 18.731 1.25 3.861 1.685 5.553 4.493 7.602 7.981 4.655 7.922 8.292 16.806 12.266 25.096a1434 1434 0 0 0 18.845 37.967l16.909 32.97c3.001 5.783 6.597 11.656 8.897 17.735a1964 1964 0 0 1-33.169 47.772c-4.604-8.923-7.129-18.859-11.852-27.738a484 484 0 0 1-19.129 1.283c-14.989 1.677-30.903.964-45.625 4.28l-1.623 6.867c-8.268-.573-16.558-1.569-24.821-2.287-9.182-.797-18.392-1.337-27.536-2.515 1.922-7.956 5.043-15.888 7.805-23.601a3629 3629 0 0 1 15.429-41.679c8.773-23.482 16.556-47.569 26.059-70.749.982-2.394 2.249-5.645 4.01-7.553 6.296-6.822 18.685-6.507 27.202-7.079m-.31 56.052c-2.805 8.451-4.55 17.255-6.747 25.88-1.985 7.793-4.781 15.965-5.667 23.951 6.844-.313 13.653-1.095 20.499-1.304 3.805-.049 7.652.015 11.427-.506-2.864-9.055-7.04-17.852-10.54-26.7-2.472-6.249-4.481-13.038-7.277-19.096-.407-.882-.991-1.567-1.695-2.225'
      />
      <path
        fill='#196FA4'
        d='M688.288 42.02c.8.027 1.615.064 2.401.221 19.155 3.816 15.466 41.541 22.134 50.116 3.76 4.836 9.05 9.902 15.389 10.591 2.562.278 5.233-.947 7.163-2.574 5.987-5.049 3.91-13.068 4.439-19.846.193-2.47.873-5.379 2.905-7.004 1.729-1.383 4.258-1.779 6.406-1.464 8.307 1.218 15.682 13.945 18.186 21.246 1.898 5.537 2.619 11.354 5.04 16.742 4.003 8.907 9.19 17.391 13.9 25.942 2.545 4.621 4.805 10.093 8.094 14.194.111.14.228.275.342.412 7.732-12.079 15.383-24.258 23.684-35.961 3.783-5.333 9.351-9.522 12.359-15.398 3.546-6.926-.055-16.045 4.483-22.35 1.007-1.399 2.232-2.378 3.997-2.581 1.834-.211 3.509.062 4.955 1.242 2.695 4.731-2.968 12.415-3.434 17.516-.318 3.478.729 6.536 3.001 9.182 2.771 3.229 7.201 5.705 10.991 7.56 23.733 11.614 32.665-12.945 52.675-11.15 4.419.396 9.546 2.403 12.315 6.022 1.031 1.348 1.488 2.947 1.237 4.635-.405 2.729-2.72 3.983-4.759 5.465-9.899 1.438-19.734-3.132-29.338-.588-6.59 1.747-9.847 5.958-13.035 11.6-1.633 4.237-2.341 9.095-4.522 13.095-3.655 6.705-9.164 12.76-13.728 18.886-12.077 16.209-26.198 33.654-36.491 50.807-.569 16.945-.178 34.027-.455 50.998-.111 6.826.309 14.298-.862 21.031-.479 2.753-1.305 6.202-3.373 8.231-5.257 5.159-13.964 3.66-20.662 3.67-3.162.005-6.322.222-9.484.252-4.828.046-9.158-.154-12.722-3.851-1.646-1.708-2.844-3.786-3.228-6.145-1.334-8.191.197-24.393.471-33.183q.538-20.88.428-41.768c-4.592-8.106-10.714-15.903-15.986-23.645l-26.71-39.686c-3.334-4.91-10.018-12.379-11.771-17.828-2.333-7.254-3.454-26.693-4.51-35.481-8.756-8.651-24.359-21.789-28.635-33.195-1.174-3.133-1.947-7.163-.365-10.299 1.512-2.999 3.987-4.617 7.075-5.659'
      />
      <path
        fill='#EB5A3C'
        d='M576.861 79.422q.249.1.497.198c6.895 2.626 15.813 4.616 22.732 1.303 6.399-3.064 12.2-8.446 17.111-13.469 6.748-6.9 13.045-14.324 19.226-21.733 5.124-6.143 10.349-13.226 16.577-18.253 1.479-1.193 4.009-2.953 6.044-2.477 1.351.317 1.75.989 2.505 2.024.516 2.812-.835 4.951-2.394 7.193-10.59 15.224-48.63 34.285-45.572 55.171.161 1.095.531 1.753 1.222 2.623 1.907 1.078 3.392.956 5.449.37 6.422-1.83 19.528-11.61 25.813-8.309.925 1.073 1.131 1.665 1.351 3.058-2.407 10.675-22.469 12.989-26.198 25.872 2.05 9.666 4.6 18.841-1.263 27.856-3.207 4.932-8.278 8.631-14.084 9.793-4.39.878-8.987.214-12.735-2.303-6.415-4.308-8.284-10.418-16.58-12.627a25.5 25.5 0 0 0-10.773-.442c-4.32.751-8.525 2.826-11.061 6.512-2.51 3.647-2.443 6.962-2.121 11.186l.346.568c12.756 20.504 62.943 9.929 77.053 53.3 3.786 11.638 3.716 23.751 1.064 35.625a55 55 0 0 1-1.442 5.177 55 55 0 0 1-1.937 5.012 55.32 55.32 0 0 1-20.701 24.139c-16.907 10.689-40.021 15.27-59.638 10.858-4.917-1.106-9.598-2.891-14.222-4.867-2.839-1.214-6.09-3.202-9.153-3.638-2.132-.304-4.14.026-5.986 1.16-3.769 2.316-7.101 10.079-11.069 10.746-1.732-.83-2.816-2.395-3.442-4.234-1.095-3.218 1.361-7.956 2.929-10.748 4.91-8.749 11.437-16.917 17.244-25.113 5.51-7.776 10.64-16.321 17.165-23.275 6.574 7.274 10.766 12.327 21.343 12.818 6.005.278 11.825-1.162 16.296-5.371 2.416-2.274 4.417-5.36 4.465-8.775.051-3.592-2.006-6.846-4.461-9.308-4.464-4.478-11.548-6.322-17.371-8.321-30.062-10.32-56.05-18.662-56.822-56.212-.343-16.687 4.498-33.451 16.3-45.66 6.823-7.058 15.056-10.761 24.152-14.01-.28-3.092-.713-5.738-2.194-8.522-3.908-5.18-9.09-9.086-12.957-14.089-1.592-2.058-3.292-2.924-5.649-3.953-.579-.539-1.169-1.07-1.683-1.675-1.237-1.456-2.321-3.304-1.953-5.29.247-1.33.971-2.103 2.065-2.824 1.67-1.101 4.198-1.161 6.086-.734 4.977 1.124 7.253 4.789 9.677 8.859l5.11 11.532c8.224 12.132 12.242 6.214 17.868 4.78 7.331-1.87 15.158-1.745 15.771-1.501'
      />
      <path
        fill='#D41654'
        d='M12.553 21.054c19.183 4.631 29.628 51.347 55.59 55.806 3.589.617 7.256.47 10.395-1.556 3.297-2.127 5.757-6.045 6.482-9.876 1.488-7.871-.322-17.916-3.404-25.24-4.505-10.702-16.13-21.335-13.882-33.993.334-1.882 1.218-4.164 2.924-5.226 1.133-.705 2.274-1.038 3.611-.752 2.515.539 4.315 2.839 5.452 4.985 6.316 11.912 4.392 52.324 16.726 56.645 1.847.648 3.635.457 5.343-.494 7.274-4.052 8.671-20.473 14.934-21.382 1.819.825 2.634 2.446 3.325 4.247 2.879 7.502-2.822 20.288 6.97 24.799 2.159.994 4.415.689 6.543-.228 4.164-1.793 12.003-10.882 16.222-9.801 6.427 1.647 7.398 10.413 16.553 6.34C182.713 58.043 189.756 32 211.97 23.105c2.215-.887 5.486-2.238 7.863-1.413a3.74 3.74 0 0 1 2.324 2.423c.576 1.936-.012 3.712-1.085 5.35-10.008 15.276-33.415 12.157-40.416 32.122-.781 2.226-1.74 5.557-1.198 7.922.326 1.423.879 1.846 2.02 2.669 7.441 1.342 21.926-10.925 28.134-3.466.212 1.204.105 1.821-.566 2.879-7.296 11.517-29.543 9.282-26.351 28.339 1.43 8.539 3.388 15.904-2.243 23.632-3.367 4.62-8.802 8.7-14.543 9.541-5.443.798-10.343-.998-14.599-4.322-8.401-6.561-12.253-12.242-24.374-10.764-4.513.55-9.869 2.842-12.632 6.597-1.769 2.405-2.238 5.404-1.665 8.306.872 4.419 4.367 7.499 8.033 9.759 5.413 3.337 11.954 5.246 17.909 7.418 23.679 8.634 45.969 17.24 52.815 44.117 3.829 15.034 1.145 28.879-3.913 43.204 3.483 5.006 7.608 6.247 13.058 8.4 6.171 4.224 24.941 15.747 25.609 23.402.104 1.191-.399 1.973-1.256 2.749-1.507 1.365-4.743 1.575-6.624 1.206-8.572-1.684-16.325-11.884-22.769-17.314-2.339-3.302-6.92-7.944-10.948-8.819-1.493-.325-2.689-.144-3.968.747-3.201 2.231-9.699 7.622-10.108 11.621-.927 9.059 19.929 27.491 25.682 34.842 2.478 3.167 5.389 7.435 4.864 11.598-.882 1.426-1.786 2.372-3.541 2.629-8.268 1.215-16.157-19.464-19.818-25.494-2.211-3.641-4.933-7.254-8.176-10.04a22.4 22.4 0 0 0-3.789-2.651c-8.849-4.858-20.814 1.063-30.161 2.292-8.169 1.074-16.556 1.355-24.727.136-10.138-1.512-25.487-11.702-31.944-11.33-3.849 2.497-2.366 12.605-5.863 16.862-3.796 4.623-10.342 8.778-16.346 9.232-2.278.173-4.313-.31-5.982-1.929-10.53-10.213 8.416-22.331 12.136-31.401 2.909-7.094 1.742-13.518 1.836-20.903.095-7.465 3.177-13.976 8.493-19.1 4.546-4.382 10.767-7.725 17.214-7.474 9.043.352 10.535 6.753 15.984 12.212 4.146 4.153 9.752 5.798 15.512 5.746 5.775-.052 11.999-1.594 16.058-5.945 3.89-4.168 3.739-8.347 3.586-13.68-7.771-11.267-23.617-14.001-35.595-18.943-9.552-3.941-18.894-8.788-26.393-16.01-13.982-13.464-15.261-28.839-17.252-47.06-.409-3.737-.895-8.897-2.817-12.209-4.097-7.056-19.146-6.754-22.488-12.088-.762-1.216-.635-1.646-.452-2.99 5.221-4.605 15.572 4.75 21.379 1.243 1.376-.832 1.953-2.361 2.12-3.884 1.356-12.402-16.552-29.334-26.195-35.446-9.834-6.232-22.14-8.892-29.591-18.504C1.8 36.012.01 31.977.594 27.968c.446-3.064 1.78-4.649 4.176-6.48 2.682-.699 5.052-.592 7.783-.434'
      />
    </g>
  </svg>
)

const MicrolinkLogo = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLImageElement> &
    ImgHTMLAttributes<HTMLImageElement>
) => (
  <img
    alt='microlink logo'
    src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NCIgaGVpZ2h0PSIzMSI+PHBhdGggZmlsbD0iI2VhNDA3YiIgZD0iTTM4LjQ2Mi4yMDlIMTguNTg3Yy0yLjg3OSAwLTUuMjIxIDIuMjE0LTUuMjIxIDQuOTM1VjcuNjZoMy4zVjUuMTQ0YzAtLjg5NS44NjItMS42MjIgMS45MjEtMS42MjJoMTkuODc1YzEuMDYgMCAxLjkyMS43MjggMS45MjEgMS42MjJWMTcuMjJjMCAuODk0LS44NjIgMS42MjEtMS45MiAxLjYyMUgxOC41ODZjLTEuMDYgMC0xLjkyMi0uNzI3LTEuOTIyLTEuNjIxdi0zLjg1OGgtMy4zdjMuODU4YzAgMi43MiAyLjM0MyA0LjkzNCA1LjIyMiA0LjkzNGgxOS44NzVjMi44NzkgMCA1LjIyLTIuMjE0IDUuMjItNC45MzRWNS4xNDRjMC0yLjcyMi0yLjM0MS00LjkzNS01LjIyLTQuOTM1eiIvPjxwYXRoIGZpbGw9IiM2NTRlYTMiIGQ9Ik0zMC4zMTcgMjUuNzM3VjIzLjIyaC0zLjN2Mi41MTdjMCAuODk1LS44NjIgMS42MjItMS45MjIgMS42MjJINS4yMjFjLTEuMDU5IDAtMS45MjEtLjcyOC0xLjkyMS0xLjYyMlYxMy42NmMwLS44OTQuODYyLTEuNjIxIDEuOTIxLTEuNjIxaDE5Ljg3NGMxLjA2IDAgMS45MjIuNzI3IDEuOTIyIDEuNjIxdjMuODU4aDMuM1YxMy42NmMwLTIuNzItMi4zNDMtNC45MzUtNS4yMjItNC45MzVINS4yMkMyLjM0MyA4LjcyNSAwIDEwLjk0IDAgMTMuNjZ2MTIuMDc3YzAgMi43MjEgMi4zNDMgNC45MzUgNS4yMjEgNC45MzVoMTkuODc0YzIuODggMCA1LjIyMi0yLjIxMyA1LjIyMi00LjkzNXoiLz48L3N2Zz4K'
    {...props}
  />
)

export const BaseLayout = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <html lang='en'>
      <body className={className}>{children}</body>
    </html>
  )
}

export const ContainerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${inter.className} bg-slate-50`}>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20'
      >
        <div className='blur-[106px] h-32 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700' />
        <div className='blur-[106px] h-24 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600' />
      </div>
      <div className='lg:max-w-xl max-w-sm mx-auto px-4'>
        <header className='container pt-8 text-center z-10 relative'>
          <NextLink href='/' className='flex justify-center'>
            <SplashyLogo className='mb-3 lg:w-80 w-56' />
            {/* <img src='/logo.svg' alt='favicon' className='inline mb-3' /> */}
            {/* <h1 className='text-5xl lg:text-8xl font-extrabold mb-3 tracking-tight bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700'>
            SPLASHY
          </h1> */}
          </NextLink>

          <p className='lg:text-xl'>Get predominant colors for any image.</p>
          <p className='text-neutral-600 pt-2 flex items-center justify-center'>
            Powered by{' '}
            <Link href='https://microlink.io'>
              <MicrolinkLogo className='inline h-4 mx-2' /> Microlink.io
            </Link>
          </p>
        </header>
        <main className='pt-8 pb-24'>{children}</main>
      </div>
      <Toaster />
      <Footer />
    </div>
  )
}
