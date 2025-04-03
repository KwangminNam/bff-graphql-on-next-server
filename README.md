## BFF GraphQL Concept Test

- BE에서 받는 REST API를 nextjs server에서 apllo-server와 resolver을 통해 gql로 변형
- 기존 BE의 presentation 역할을 next server에서 처리
- 기존 FE는 변한것 없음 (똑같은 usequery , usemutation)
- field 추가는 REST API에서 처리
- FE가 UI에서 필요한것 next server에서 response값 전달

## required pakcages

- as-integrations/next
- apollo-client/server