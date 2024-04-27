import {
  CloseLoan as CloseLoanEvent,
  ClosePosition as ClosePositionEvent,
  NewLoan as NewLoanEvent,
  NewPool as NewPoolEvent,
  NewPosition as NewPositionEvent,
  OwnershipTransferStarted as OwnershipTransferStartedEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/Electron/Electron"
import {
  CloseLoan,
  ClosePosition,
  NewLoan,
  NewPool,
  NewPosition,
  OwnershipTransferStarted,
  OwnershipTransferred
} from "../generated/schema"

export function handleCloseLoan(event: CloseLoanEvent): void {
  let entity = new CloseLoan(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.poolId = event.params.poolId
  entity.account = event.params.account
  entity.state = event.params.state
  entity.repaidDate = event.params.repaidDate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClosePosition(event: ClosePositionEvent): void {
  let entity = new ClosePosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.poolId = event.params.poolId
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewLoan(event: NewLoanEvent): void {
  let entity = new NewLoan(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.poolId = event.params.poolId
  entity.account = event.params.account
  entity.principal = event.params.principal
  entity.collateral = event.params.collateral
  entity.state = event.params.state
  entity.startDate = event.params.startDate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewPool(event: NewPoolEvent): void {
  let entity = new NewPool(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.poolId = event.params.poolId
  entity.principalId = event.params.principalId
  entity.collateralId = event.params.collateralId
  entity.totalSupplied = event.params.totalSupplied
  entity.totalBorrowed = event.params.totalBorrowed
  entity.interest = event.params.interest

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewPosition(event: NewPositionEvent): void {
  let entity = new NewPosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.poolId = event.params.poolId
  entity.account = event.params.account
  entity.principal = event.params.principal
  entity.startDate = event.params.startDate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferStarted(
  event: OwnershipTransferStartedEvent
): void {
  let entity = new OwnershipTransferStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
