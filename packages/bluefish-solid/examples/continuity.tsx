// https://en.wikipedia.org/wiki/File:Continuity_topology.svg
/* 
A function f : X -> Y
is continuous at a point x in X

iff

for every neighborhood V of f(x) in Y
there is a neighborhood U of x in X
s.t. f(U) is a subset of V
*/

/* 
- Draw X
- Draw Y
- Draw x
- Draw f(x)
- Draw V


<Row>
  <Space name="X" label="X">
    <Neighborhood name="U" label="U">
      <Point name="x" label="x">
    </Neighborhood>
  </Space>
  <Space name="Y" label="Y">
    <Neighborhood name="V" label="V">
      <Neighborhood name="f(U)" label="f(U)">
        <Point name="f(x)" label="f(x)">
      </Neighborhood>
    </Neighborhood>
  </Space>
</Row>
<Arrow name="f" label="f">
  <Ref refId="U" />
  <Ref refId="f(U)" />
</Arrow>
*/
